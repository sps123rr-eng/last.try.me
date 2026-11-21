function addUser(name,pswrd,done){
    $.post('/api/users',{username:name,password:pswrd},function(data){
        done(data)
    })
}

$(function () {
    let usernameField=$('#userName')
    let pswrdField=$('#password')
    $('#signupBtn').click(function (){
        let name=usernameField.val()
        let pswrd=pswrdField.val()

        addUser(name,pswrd,function(user){
            console.log('new user id='+user.id)
            sessionStorage.setItem('uid',user.id)
            sessionStorage.setItem('uName',user.name)
            location.href = "/catalog.html"
        })
    })
})