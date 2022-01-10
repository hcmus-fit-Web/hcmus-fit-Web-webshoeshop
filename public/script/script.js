// product comment
$('#comment-form input[type="submit"]').on('click' ,function (event) {
    event.preventDefault();
    $.post(`/api/single/${$('#product-id').val()}/comments`,{
        content: $('#comment-content').val(),
    },function (data){
        const commentTemplate = Handlebars.compile(document.getElementById("comment-template").innerHTML);
        const commentHTML = commentTemplate(data);
        console.log(data.status);
        $('#comment-list').prepend(commentHTML);
    }).fail(function (data){
        if (data.status === 401){
            window.location.href = `/login?redirect=${window.location.href}`
        };
    });

})

