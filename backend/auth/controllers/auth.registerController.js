export function registerController(req, res) {
    const { userName, correo, contrasena} = req.body;
    res.send(`Se recibio ls siguientes datos, Usuario: ${userName}, Correo: ${correo}, Contrasena: ${contrasena},`);
}