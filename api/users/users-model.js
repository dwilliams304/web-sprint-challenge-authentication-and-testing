const db = require('../../data/dbConfig');



async function add(user){
    const id = await db('users').insert(user);
    return findById(id);
}

async function findBy(filter){
    return db('users').where(filter);
}

async function findById(user_id){
    return db('users').where('id', user_id).first();
}



module.exports = {
    add,
    findBy,
    findById,
}