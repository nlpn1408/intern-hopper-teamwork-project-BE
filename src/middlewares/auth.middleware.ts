    import { NextFunction, Request, Response } from "express"
    const jwt = require("jsonwebtoken")
    const apiKey = process.env.APIKEY
    const prefix = process.env.PREFIX
    const publicApi = ["/auth/login"]
    const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const checkPublicApi = publicApi.find(item => prefix + item === req.originalUrl);
            if (checkPublicApi) {
                console.log(checkPublicApi)
                next()
                return
            }
            const token = req?.headers?.authorization?.split(" ")[1]
            if (!token) {
                res.status(401).json({
                    message: "Không có quyền truy cập"
                })
            }
            if (!apiKey) {
                throw new Error("Không có APIKEY")
            }
            const decoded = jwt.verify(token, apiKey,)
            next()
        } catch (error) {
            res.status(401).json({
                message: "Không có quyền truy cập"
            })
        }
    }

    export default authMiddleware