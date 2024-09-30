import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()

app.use(express.json())
app.use(cors())



//Criar usuário - Método POST
app.post("/Users", async(req, res) => {
    const {email, name, age} = req.body

    try{
        const existingEmail = await prisma.user.findUnique({
            where: {email}
        })

        if (existingEmail) {
            return res.status(409).json({message:"Email já cadastrado"})
        }    
        
        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                age
            }
        })

    res.status(201).json(newUser)
    } catch (error) {
    res.status(500).json({message: "Erro ao criar usuário", error :error.message});
    }

})




//Atualizando usuário - Método PUT
app.put("/Users/:id", async(req, res) => {

    console.log(req)
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body) 
})




//Listar usuário - Método GET
app.get("/Users", async (req, res) => {

    let users = []

    if(req.query){
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                age: req.query.age,
                email: req.query.email
            }
        })
    } else {
        users = await prisma.user.findMany()
    }

    

    res.status(200).json(users)
})


//Removendo usuário - Método DELETE
app.delete("/Users/:id", async(req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({message: 'Usuário deletado'})
})
 

app.listen(3000)

/* Criar API de usuários

  nascimentopaeslemegabriel
  HaINByWTYbd6iiob

    1 - Criar usuário
    2 - listar usuários
    3 - editar usuários
    4 - deletar usuários

    

*/