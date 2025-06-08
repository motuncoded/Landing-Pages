const { Router } = require("express");
const {
  register,
  login } = require("../controllers/userController");

const userRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and authorization
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegister:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - gmail
 *    
 *       properties:
 *         username:
 *           type: string
 *           example: John
 *         password:
 *           type: string
 *           example: Doe2024
 *         gmail:
 *           type: string
 *           format: gmail
 *           example: johndoe@example.com
 *        
 *     UserLogin:
 *       type: object
 *       required:
 *         - gmail
 *         - password
 *       properties:
 *         gmail:
 *           type: string
 *           format: gmail
 *           example: johndoe@example.com
 *         password:
 *           type: string
 *           format: password
 *           example: password123
 *    
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       201:
 *         description: User registered successfully. 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Registration successful.
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       409:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Gmail already registered
 */
userRouter.post("/auth/register", register);


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   example: jwt.token.here
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     gmail:
 *                       type: string
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
userRouter.post("/auth/login", login);


module.exports = userRouter;
