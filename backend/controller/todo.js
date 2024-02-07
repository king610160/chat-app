class Todo {
    static async getAll(req, res) {
        try {
            const str = 'All User'
            res.send(str)
        } catch (err) {
            console.log(err)
            res.status(500).send('Internal Server Error')
        }
    }
}

module.exports = Todo