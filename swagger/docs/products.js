/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required: [name, price, brand, sizes, stock, images, category]
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         price:
 *           type: number
 *           minimum: 0
 *         description:
 *           type: string
 *         brand:
 *           type: string
 *         sizes:
 *           type: string
 *           enum: ['38', '39', '40', '41', '42', '43', '44']
 *         stock:
 *           type: number
 *           minimum: 0
 *         images:
 *           type: string
 *         category:
 *           type: string
 *         averageRating:
 *           type: number
 *           default: 0
 *         numOfReviews:
 *           type: number
 *           default: 0
 *         review:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Review'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
