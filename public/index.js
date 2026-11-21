function fetchUser(name,pswrd,done){
    $.get('/api/users',{username:name,password:pswrd},function(data){
        done(data)
    })
}

$(function () {
    let usernameField=$('#userName')
    let pswrdField=$('#password')
    $('#loginBtn').click(function (){
        let name=usernameField.val()
        let pswrd=pswrdField.val()

        fetchUser(name,pswrd,function(user){
            console.log(user);

            if(user.length == 0){
                console.log('failed to login')
                alert('Wrong username or password')
            }else{
                console.log('login with:'+user[0].name)
                sessionStorage.setItem('uid',user[0].id)
                sessionStorage.setItem('uName',user[0].name)
                if(user[0].name == 'admin'){
                    location.href = '/add_products.html'
                }else{
                    location.href = '/catalog.html'
                }
            }
        })
    })
})