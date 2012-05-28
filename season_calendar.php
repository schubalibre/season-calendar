<?php 

$start = mktime(0,0,0,1,1,2012); // start date
$end = mktime(23,59,59,12,30,2012) + 1; // end date
$rows = 7; // how much days per line
$month = 0; // ​​counter of months
$r = 0; // ​​counter of days

?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>season calendar whith php and jquery</title>
		<link href="style.css" type="text/css" rel="stylesheet" />
		
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script>
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.js"></script>
		
		<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/base/jquery-ui.css" type="text/css" />
		
		<script type="text/javascript" src="season_calendar.js"></script>
		
	</head>
	<body>
		<div id="warper">
			
			<?php 

			for ($i = $start; $i <= $end; $i += 86400){

				// Start the new month
				if($month != date('m',$i )){
					
					$month = date('m',$i );
					
					$r = 0;

					echo "
					<div class='month'>
						<table>
							<thead>
								<tr>
									<th colspan='$rows'>".date('F',$i )."</th>
								</tr> "; // the name of the month
					
					echo "<tr>"; // open the box
					
					$current_day = date('N',$i) - 1; // current day
					$start_day = $i - ($current_day * 86400); // Monday
					$end_day = $i + (($rows - $current_day) * 86400); // Sunday

					// the name of the day
					for ($n = $start_day; $n < $end_day; $n += 86400){
						echo "<th>".date('D',$n )."</th>";
					}
					
					echo "</tr>
					</thead>";
					

					echo "<tbody><tr>";
					// los dias del del ultimo mes
					for ($n = $start_day; $n < $i; $n += 86400){
						echo "<td id='".date('Y-m-d',$n )."' class='prev_month'>".date('d',$n )."</td>";
						$r++;
					}
					
				}
				
				if($rows == $r){
					$r = 0;
					echo "</tr><tr>";
				}
	
				// the days of the month
				echo "<td class='selectable' data-date='".date('Y-m-d',$i )."'>".date('d',$i )."</td>";
				
				$r++;

				if( date('j',$i) == date('t',$i) ){
					echo "</tr></tbody></table></div>"; //close the box
				}

			}

			?>
			<div id="dateBox"><!-- my dates --></div>
		</div>
	</body>
</html>
