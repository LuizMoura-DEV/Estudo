module.exports = (app)=>{
    
    app.get('/',(req, res)=>{    
    
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>RESTful API</h1><br>'+
        '<h3>Projeto desenvolvido no Curso Completo de JS da HCode!</h3>');
    
    });
    
};