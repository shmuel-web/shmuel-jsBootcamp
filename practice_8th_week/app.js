var BL = (function () {
    var cache = [];

    function getContactById(id) {
        var promise = false;
        cache.forEach(function (item) {
            if (item.id == id) {
                promise = Q.when(item.data);
            }
        });

        if (!promise) {
            promise = Q($.ajax({
                url: "/shmuel-jsBootcamp/practice_8th_week/content/" + id + ".json",
                type: 'GET',
            })).then(function (data) {
                console.log(data);
                cache.push({
                    id: id,
                    data: data,
                });

                if (cache.length > 5) {
                    cache.shift();
                }
                return data;
            });
        }
        return promise;
    }

    return {
        getContactById:getContactById,
    }

})();

BL.getContactById(1).then(function(data){
    console.log(data);
    BL.getContactById(1).then(function(data){
        console.log(data);
    });
});

