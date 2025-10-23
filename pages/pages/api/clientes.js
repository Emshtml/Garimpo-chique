let clientes=[];
export default function handler(req,res){
  if(req.method==="GET") res.status(200).json(clientes);
  else if(req.method==="POST"){const c=req.body;c.id=clientes.length+1;clientes.push(c);res.status(201).json(c);}
  else res.status(405).end();
}
