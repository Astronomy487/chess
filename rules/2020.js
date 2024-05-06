rules_name = "2020 Election";
rules_description = "The 2020 election";

c.king.svg = [
	"https://cdn.britannica.com/31/149831-050-83A0E45B/Donald-J-Trump-2010.jpg?w=400&h=300&c=crop",
	"https://www.reuters.com/resizer/8A5i0ug_Mpah25hzxukJYsx19-s=/1200x1500/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/QES3ISDRWFPMDGNEZRRTFLNWZE.jpg"
];
c.pawn.svg = [
	"https://www.shutterstock.com/image-vector/republican-elephant-vector-icon-flat-260nw-1610328151.jpg",
	"https://commonwealthmagazine.org/wp-content/uploads/2015/02/DemDonkey.jpg"
];
c.queen.svg = [
	"https://media.vanityfair.com/photos/5eb835015af441fe3976da8f/2:3/w_887,h_1331,c_limit/Mike-Pence.jpg",
	"https://i.guim.co.uk/img/media/e2a3f6459e92dc1799606d6eaf8c8fca4fb64627/0_211_5094_3057/master/5094.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=abefe97d70a9853b1f3a03046dd66b3f"
];
c.bishop.svg = [
	"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Mitch_McConnell_2016_official_photo_%281%29.jpg/1200px-Mitch_McConnell_2016_official_photo_%281%29.jpg",
	"https://media.vanityfair.com/photos/5f5113571e10df7a77868acf/1:1/w_1336,h_1336,c_limit/nancy.jpg"
];
c.knight.svg = [
	"https://static.texastribune.org/media/files/600d28682a2731e6cfa9649926acbc5a/Ted-Cruz.jpg",
	"https://bloximages.chicago2.vip.townnews.com/qchron.com/content/tncms/assets/v3/editorial/b/59/b5941366-abfe-11ea-9bf3-df319e2c6e0e/5ee2588872746.image.jpg"
];
c.rook.svg = [
	"https://bloximages.newyork1.vip.townnews.com/columbiamissourian.com/content/tncms/assets/v3/editorial/4/b8/4b8b00b0-0876-5c4b-aabe-1be814450648/557b9ca7d5ec6.image.jpg?crop=800%2C800%2C0%2C259&resize=1200%2C1200&order=crop%2Cresize",
	"https://npg.si.edu/sites/default/files/blog_obama_martin_schoeller.jpg"
];

if (Math.random() < 0.5) {
	team_names = ["Democrat", "Republican"];
	for (type of Object.keys(c)) [c[type].svg[0], c[type].svg[1]] = [c[type].svg[1], c[type].svg[0]];
} else {
	team_names = ["Republican", "Democrat"];
}

board = board_from_simple_fen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");