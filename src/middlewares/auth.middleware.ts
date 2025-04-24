import { NextFunction, Request, Response } from "express"
const jwt = require("jsonwebtoken")
const apiKey = process.env.APIKEY
const prefix = process.env.PREFIX
const publicApi = ["/auth/login", "/auth/signup"]
const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {

        //bỏ qua những public api 
        const checkPublicApi = publicApi.find(item => prefix + item === req.originalUrl);
        if (checkPublicApi) {
            console.log(checkPublicApi)
            next()
            return
        }

        //lấy token từ client
        const token = req?.headers?.authorization?.split(" ")[1]
        console.log("token: ", token);

        //kiểm tra token có tồn tại hay không 
        if (!token) {
            res.status(401).json({
                message: "Không có quyền truy cập"
            })
        }

        //kiểm tra apikey
        if (!apiKey) {
            throw new Error("Không có APIKEY")
        }

        //verify token 
        const decoded = jwt.verify(token, apiKey,)
        next()
    } catch (error) {
        res.status(401).json({
            message: "Không có quyền truy cập"
        })
    }
}

export default authMiddleware