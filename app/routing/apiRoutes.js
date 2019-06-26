var friendsData = require("../data/friends");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function (req, res) {

        var userMatch = {
            name: null,
            age: null,
            photo:null,
            matchDifference: 100
        }

        var userData = req.body;
        var userValues = userData.values

        var friendDifference;

        for (var i = 0; i < friendsData.length; i++) {
            friendDifference = 0;
            var thisFriend = friendsData[i];
            var thisFriendValues = thisFriend.values;
            for (var j = 0; j < userValues.length; j++) {
                var thisValueDifference = Math.abs(parseInt(userValues[j]) - parseInt(thisFriendValues[j]));
                friendDifference += thisValueDifference;
            }
            if (friendDifference < userMatch.matchDifference) {
                userMatch.name = thisFriend.name;
                userMatch.age = thisFriend.age;
                userMatch.photo = thisFriend.photo;
                userMatch.matchDifference = friendDifference;
            }
        }

        friendsData.push(userData);

        res.json(userMatch);

    });

}