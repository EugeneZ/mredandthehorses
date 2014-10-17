<html>
<head>
<link rel="stylesheet" type="text/css" href="style.css" />
<title>MrEdAndTheHorses.com - Shows</title>
</head>
<body>
	<ul class="locations">
		<li class="first">Coming soon to:</li>
		<li>Cafe Nine, New Haven, CT</li>
		<li>The Space, Hamden, CT</li>
		<li>Daniel Street Club, Milford CT</li>
		<li>Poverty Hollow Theater, Seymour, CT</li>
	</ul>

<?php
/* THIS IS THE OLD SHOWS HTML... use it as a guide if you need to
<p><b>Tuesday, September 4<sup>th</sup></b></p>
<p><a href="#" onClick="window.open('http://www.cafenine.com'" >Cafe Nine, New Haven</a></p>
<p>10 PM</p>
<p>&nbsp;</p>
<p><b>Monday, September 17<sup>th</sup></b></p>
<p><a href="#" onClick="window.open('http://www.thespace.tk')" >The Space, Hamden</a></p>
<p>Doors @ 7 PM</p>
<p>&nbsp;</p>
<p><b>Saturday, September 22<sup>nd</sup></b></p>
<p><a href="#" onClick="window.open('http://www.barnightclub.com')">Bar, New Haven</a></p>
<p>Benefit Concert</p>
<p>8 PM</p>
<p>&nbsp;</p>
<p><b>Saturday, November 3<sup>rd</sup></b></p>
<p><a href="#" onClick="window.open('http://www.thespace.tk')" >The Space, Hamden</a></p>
<p>Doors @ 7 PM</p>
*/

/* OLD SHOWS SCRIPT */
/*
// the password
define("PASSWORD", "911fish");

// the connection
$connection = mysql_connect("localhost","mred_shows","911fish");
mysql_select_db("mred_shows", $connection);

// if we need to delete something, check the password
if (isset($_GET['delete']))
if ($_POST['password']==PASSWORD) mysql_query("DELETE FROM `shows` WHERE `id`={$_GET['delete']};", $connection);

// if we need to add something, check password... more input checking should be done but this shouldn't ever get into the hands of malicious users
if (isset($_GET['submit']))
if ($_POST['password']==PASSWORD) mysql_query("INSERT INTO `shows` (`venue`, `date`, `time`, `price`) VALUES ('{$_POST['venue']}','{$_POST['date']}','{$_POST['time']}','{$_POST['cost']}');", $connection);

// grab shows... note how we do this AFTER adding/deleting
$result = mysql_query("SELECT `id`, `venue`, `date`, `time`, `price`, `note` FROM `shows`;", $connection);

// if we're requesting an add form, spit it out
if (isset($_GET['add']))
print '<form method="post" action="shows.php?submit">
<p>Venue: <input type="text" name="venue" /></p>
<p>Date: <input type="text" name="date" /></p>
<p>Time: <input type="text" name="time" /></p>
<p>Cost: <input type="text" name="cost" /></p>
<p>Password: <input type="password" name="password" /></p>
<p><input type="submit" name="submit" value="submit" /></p>
</form>';

// if there ARE no shows
if (mysql_num_rows($result) == 0) print "<p>We've got no shows scheduled at the moment, sorry.</p>";

// print the shows
while ($show = mysql_fetch_assoc($result))
{
print "
<table class=\"shows\">
<tr class=\"showheader\">
<td class=\"showheader\">
<p class=\"showheader\">{$show['venue']}</p>
</td>
</tr>
<tr class=\"showdata\">
<td class=\"showdata\">
<p class=\"showdata\"><b class=\"showdata\">Date:</b> {$show['date']}</p>
<p class=\"showdata\"><b class=\"showdata\">Time:</b> {$show['time']}</p>
<p class=\"showdata\"><b class=\"showdata\">Cost:</b> {$show['price']}</p>
</td>
</tr>
</table>
<br />
";

// print the deletion form if we're in admin mode
if (isset($_GET['add'])) print "<form method=\"post\" action=\"shows.php?delete={$show['id']}\"><p>Password: <input type=\"password\" name=\"password\" /></p><p><input type=\"submit\" name=\"submit\" value=\"Delete Above Show\"></p></form>";
}*/
?>

</body>
</html>
