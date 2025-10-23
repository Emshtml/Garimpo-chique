export default function handler(req,res){
  if(req.method!=="POST") return res.status(405).end();
  const {usuario,senha}=req.body;
  if(usuario==="admin" && senha==="garimpo2025") res.status(200).json({sucesso:true,token:"acesso-liberado"});
