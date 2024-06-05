import { pool } from "../db.js"

export const searchBookingsById = async(req, res)=>{
    try {
        const {id} = req.params
        const [response]= await pool.query("SELECT * FROM bookings WHERE idbookings = ?", [id])
        if(response.length===0){
            return res.status(404).send({mesagge: "No se encontro reserva con el id suministrado"})
        }
        res.status(200).send(response)
    } catch (error) {
        console.log(error.mesagge)
        res.status(500).send(error.mesagge)
    }
}
export const createBooking = async(req,res)=>{
    try {
        const {idrooms, idcliente, nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida} = req.body
        const fechaFormat = fecha_reservacion.slice(0, 19).replace('T', ' ');
        const [response] = await pool.query('INSERT INTO bookings (idrooms, idcliente, nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida) VALUES (?,?,?,?,?,?,?)', [idrooms, idcliente, nombre_cliente, telefono_cliente, fechaFormat, fecha_entrada, fecha_salida])
        if(response.affectedRows === 0){
            return res.status(404).send({mesagge:"Revisar campos, error al guardar"})
        }
        res.status(200).send({mesagge:"Exitosamente guardado"})
    } catch (error) {
        console.log(error)
        res.status(500).send({message: error.message})
    }
}
export const allBookingsByUser = async(req, res) => {
    try {
        const { id } = req.params;
        const [response] = await pool.query(
            'SELECT * FROM bookings INNER JOIN rooms ON bookings.idrooms = rooms.idrooms INNER JOIN users ON bookings.idcliente = users.idusers WHERE bookings.idcliente =?',
            [id]
        );
        if (response.length === 0) {
            return res.status(200).send([]);
        }
        res.status(200).send(response); 
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message }); 
    }
    
};
export const deleteBookingById = async(req,res)=>{
    try {
        const {id} = req.params
        const [response] = await pool.query('DELETE FROM bookings WHERE idbookings=? ', [id])
        if(response.affectedRows===0){
            return res.send({mesagge: 'No se ha podido eliminar la reservacion, confirma el id'})
        }
        res.send({messagge: 'Reserva eliminada correctamente'})
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}
export const updateBookingById = async(req, res) => {
    try {
        const { id } = req.params;  
        const { idrooms, telefono_cliente, fecha_entrada, fecha_salida } = req.body;  
        const [response] = await pool.query(
            'UPDATE bookings SET idrooms=?, telefono_cliente=?, fecha_entrada=?, fecha_salida=? WHERE idbookings=?',
            [idrooms, telefono_cliente, fecha_entrada, fecha_salida, id]
        );
        if (response.affectedRows === 0) {
            return res.status(404).send({ message: 'No se encontró la reserva con ese ID' });
        }

        res.sendStatus(200); 
    } catch (error) {
        console.log(error.message); 
        res.status(500).send({ message: error.message }); 
    }
}