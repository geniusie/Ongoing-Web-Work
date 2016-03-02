<?php 
//////////////////////////
//Specify default values//
//////////////////////////

//Settings
$max_allowed_file_size = 10000; // size in KB
$allowed_extensions = array("step", "stl", "obj", "zip");
$upload_folder = 'uploads/'; //<-- this folder must be writeable by the script
$boundary =md5(date('r', time())); 

//Your E-mail
// $your_email = 'curtis.ingleton@gmail.com';
$your_email = 'admin@geniusie.com';

//Default Subject if 'subject' field not specified
$default_subject = 'From My Contact Form';

//Message if 'name' field not specified
$name_not_specified = 'Please type a valid name';

//Message if 'message' field not specified
$message_not_specified = 'Please type a vaild message';

//Message if file is too big
$message_file_too_big = 'Size of file should be less than $max_allowed_file_size KB';

//Message if file is wrong type
$message_file_wrong_type = "The uploaded file is not supported file type. ".
  " Only the following file types are supported: ".implode(',',$allowed_extensions);

// Message if file is not uploaded
$message_file_copy_error = 'error while copying the uploaded file';

//Message if e-mail sent successfully
$email_was_sent = 'Thanks, your message successfully sent';

//Message if e-mail not sent (server not configured)
$server_not_configured = 'Sorry, mail server not configured';


///////////////////////////
//Contact Form Processing//
///////////////////////////
$errors = array();

if(isset($_POST['message']) and isset($_POST['name'])) {
	if(!empty($_POST['name']))
		$sender_name  = stripslashes(strip_tags(trim($_POST['name'])));
	
	if(!empty($_POST['message']))
		$message      = stripslashes(strip_tags(trim($_POST['message'])));
	
	if(!empty($_POST['email']))
		$sender_email = stripslashes(strip_tags(trim($_POST['email'])));
	
	if(!empty($_POST['subject']))
		$subject      = stripslashes(strip_tags(trim($_POST['subject'])));

	// if(!empty($_FILES['file']) {
		$filename = basename($_FILES['file']['name']);
		//get the file extension of the file
		$filetype =
		    substr($filename,
		    strrpos($filename, '.') + 1);

		$filesize =
		    $_FILES["file"]["size"]/1024;//size in KBs
	// }

	//Message if no sender name was specified
	if(empty($sender_name)) {
		$errors[] = $name_not_specified;
	}

	//Message if no message was specified
	if(empty($message)) {
		$errors[] = $message_not_specified;
	}

	//Message if file size is too big
	if($filesize > $max_allowed_file_size ) {
	  $errors[] = $message_file_too_big;
	}

	//------ Validate the file extension -----
	// $allowed_ext = false;
	// for($i=0; $i<sizeof($allowed_extensions); $i++) {
	//   if(strcasecmp($allowed_extensions[$i],$filetype) == 0) {
	//     $allowed_ext = true;
	//   }
	// }
	 
	// if(!$allowed_ext) {
	//   $errors[] = $message_file_wrong_type;
	// }

	//copy the temp. uploaded file to uploads folder
	$tmp_path = $_FILES["file"]["tmp_name"];
	$attachment = chunk_split(base64_encode(file_get_contents($_FILES['file']['tmp_name'])));


	if ($_FILES["file"]["error"] == UPLOAD_ERR_OK) {
	    $name = $_FILES["file"]["name"];
    	move_uploaded_file( $_FILES["file"]["tmp_name"], $upload_folder . $_FILES['file']['name']);
  	}

	$header = (!empty($sender_email)) ? 'From: '.$sender_email : '';
    $header .= "\r\nMIME-Version: 1.0\r\nContent-Type: multipart/mixed; boundary=\"_1_$boundary\"";

	$subject = (!empty($subject)) ? $subject : $default_subject;

	$message = (!empty($message)) ? wordwrap($message, 70) : '';
	$message .= "Below is the attachment in MIME format.

--_1_$boundary
Content-Type: multipart/alternative; boundary=\"_2_$boundary\"

--_2_$boundary
Content-Type: text/plain; charset=\"iso-8859-1\"
Content-Transfer-Encoding: 7bit

$message

--_2_$boundary--
--_1_$boundary
Content-Type: application/octet-stream; name=\"$filename\" 
Content-Transfer-Encoding: base64 
Content-Disposition: attachment 

$attachment
--_1_$boundary--";

	//sending message if no errors
	if(empty($errors)) {
		if (mail($your_email, $subject, $message, $header)) {
			echo $email_was_sent;
		} else {
			$errors[] = $server_not_configured;
			echo implode('<br>', $errors );
		}
	} else {
		echo implode('<br>', $errors );
	}
}
?>