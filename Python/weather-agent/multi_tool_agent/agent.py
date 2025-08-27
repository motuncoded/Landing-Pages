import os
import datetime
import requests
from zoneinfo import ZoneInfo
from google.adk.agents import Agent

# --- API KEY SETUP ---
OPENWEATHER_API_KEY = os.environ.get("OPENWEATHER_API_KEY")
if not OPENWEATHER_API_KEY:
    raise EnvironmentError(
        "❌ OPENWEATHER_API_KEY not found. Please set it before running:\n\n"
        "   Windows (CMD):   set OPENWEATHER_API_KEY=your_api_key_here\n"
        "   PowerShell:      $env:OPENWEATHER_API_KEY=\"your_api_key_here\"\n"
        "   Mac/Linux:       export OPENWEATHER_API_KEY=your_api_key_here\n"
    )


def suggest_clothes(temp: float) -> str:
    """Suggests clothes based on temperature."""
    if temp < 10:
        return "wear a heavy jacket, gloves, and boots."
    elif 10 <= temp < 20:
        return "wear a light jacket or sweater."
    elif 20 <= temp < 30:
        return "wear a T-shirt and jeans."
    else:
        return "wear light clothes like shorts and a T-shirt."

def weather_icon(description: str) -> str:
    """Returns a weather icon based on the weather description."""
    icons = {
        "clear sky": "☀️",
        "few clouds": "🌤️",
        "scattered clouds": "🌥️",
        "broken clouds": "☁️",
        "shower rain": "🌧️",
        "rain": "🌧️",
        "thunderstorm": "⛈️",
        "snow": "❄️",
        "mist": "🌫️",
    }
    return icons.get(description, "🌈")


def get_weather(city: str) -> dict:
    """Retrieves the current weather report for a specified city using OpenWeatherMap API."""
    BASE_URL = "http://api.openweathermap.org/data/2.5/weather"

    url = f"{BASE_URL}?q={city}&appid={OPENWEATHER_API_KEY}&units=metric"

    try:
        response = requests.get(url, timeout=10)
        data = response.json()

        if response.status_code != 200:
            return {"status": "error", "error_message": data.get("message", "Unknown error")}

        # Extract weather info
        weather = data["weather"][0]["description"].capitalize()
        temp_c = data["main"]["temp"]
        temp_f = round((temp_c * 9/5) + 32, 1)
        temp_k = round(temp_c + 273.15, 1)
        humidity = data["main"]["humidity"]

        # Suggest clothes
        clothes = suggest_clothes(temp_c)

        icon = weather_icon(weather)

        report = (
            f"The weather in {city.title()} is {icon} {weather} "
            f"with a temperature of {temp_c}°C ({temp_f}°F, {temp_k}K) "
            f"and humidity of {humidity}%. "
            f"I suggest you {clothes}"
        )

        return {"status": "success", "result": report}

    except Exception as e:
        return {"status": "error", "error_message": str(e)}


# def get_current_time(city: str) -> dict:
#     """Returns the current time in a specified city using TimeZone API."""
#     try:
#         response = requests.get("http://worldtimeapi.org/api/timezone")
#         timezones = response.json()

#         tz_match = [tz for tz in timezones if city.replace(" ", "_") in tz]

#         if not tz_match:
#             return {"status": "error", "error_message": f"Timezone not found for {city}"}

#         tz = tz_match[0]
#         response = requests.get(f"http://worldtimeapi.org/api/timezone/{tz}")
#         data = response.json()

#         datetime_str = data["datetime"]
#         report = f"The current time in {city.title()} is {datetime_str} ({tz})."
#         return {"status": "success", "result": report}

#     except Exception as e:
#         return {"status": "error", "error_message": str(e)}


root_agent = Agent(
    name="weather_time_agent",
    model="gemini-2.0-flash",  # fallback: "gemini-1.5-flash" if issues
    description="Agent to answer questions about the time, weather, and clothing recommendations in a city.",
    instruction="You are a helpful agent who can answer user questions about the time, weather, and suggest clothes.",
    tools=[get_weather]
)
