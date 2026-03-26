import { saveData } from "../models/auth.model.js"

export function registerController(req, res) {
    const { userName, correo, contrasena } = req.body;
    const datos = saveData(userName, correo, contrasena);
    res.send(datos, 'recibidos');
}