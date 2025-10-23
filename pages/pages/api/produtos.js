let produtos=[{id:1,nome:"Vestido",descricao:"Roupas lindas",preco:50}];
export default function handler(req,res){
  if(req.method==="GET") res.status(200).json(produtos);
  else res.status(405).end();
}

