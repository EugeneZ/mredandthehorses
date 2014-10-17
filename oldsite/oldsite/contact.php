<?php

if ($_GET['a']=="submit")
{
	$name = substr($_POST['name'], 0, 30);
	$phone = substr($_POST['phone'], 0, 15);
	$email = substr($_POST['email'], 0, 45);
	$message = wordwrap(substr($_POST['message'], 0, 1500));

	if ($message == "")
	{
		print "<html><head><title>Contact</title>
		<link rel=\"stylesheet\" type=\"text/css\" href=\"style.css\" /></head><body><p>System error...</p></body></html>";
		die();
	}

	if(mail("zareted@yahoo.com;eugene.zar@gmail.com","Mail from MrEdAndTheHorses","From: $name\nPhone: $phone\nE-mail: $email\n\n\n$message")) {
		print "<html><head><title>Contact</title><link rel=\"stylesheet\" type=\"text/css\" href=\"style.css\" /></head><body><p>Thanks!</p></body></html>";
	} else {
		print "<html><head><title>Contact</title><link rel=\"stylesheet\" type=\"text/css\" href=\"style.css\" /></head><body><p>System error...</p></body></html>";
	}
	die();
}

print '
<html>
<head>
<link rel="stylesheet" type="text/css" href="style.css" />
<title>MrEdAndTheHorses.com - Contact</title>
</head>
<body>
<form method="post" action="contact.php?a=submit">
<p>Name: <input type="text" name="name" /></p>
<p>Phone: <input type="text" name="phone" /></p>
<p>E-mail: <input type="text" name="email" /></p>
<p>Message:</p>
<p><textarea rows="8" cols="20" name="message"></textarea></p>
<p align=center><input type="submit" name="Submit" value="Send Message" /></p>
</form>
</body>
</html>';
die();
?>
