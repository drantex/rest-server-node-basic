

const getUsuarios = (req, res) => {

    const { q, name = 'NOTNAME', page = 1 } = req.query;
    res.json({
        msg: 'get Api - controllers',
        q,
        name,
        page
    })
}


const postUsuarios = (req, res) => {

    const {name, age} = req.body;
    res.json({
        nombre: name, edad: age
    })
}


const putUsuarios = (req, res) => {
    
    const id = req.params.id;
    res.json({
        msg: 'put Api - controllers',
        id
    })
}


const deleteUsuarios = (req, res) => {
    res.json({
        msg: 'Delete Api - controllers'
    })
}


module.exports = {
    getUsuarios,
    postUsuarios,
    putUsuarios,
    deleteUsuarios
}