let pedidos=[];
export default function handler(req,res){
  if(req.method==="GET") res.status(200).json(pedidos);
  else if(req.method==="POST"){const p=req.body;p.id=pedidos.length+1;pedidos.push(p);res.status(201).json(p);}
  else res.status(405).end();
}
