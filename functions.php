<?php
function sqlSelect($C, $query, $format = false, ...$vars) {
    $stmt = $C->prepare($query);
    if($format) {
        $stmt->bind_param($format, ...$vars);
    }
    if($stmt->execute()) {
        $res = $stmt->get_result();
        $stmt->close();
        return $res;
    }
    $stmt->close();
    return false;
}

function sqlInsert($C, $query, $format = false, ...$vars) {
    $stmt = $C->prepare($query);
    if($format) {
        $stmt->bind_param($format, ...$vars);
    }
    if($stmt->execute()) {
        $id = $stmt->insert_id;
        $stmt->close();
        return $id;
    }
    $stmt->close();
    return -1;
}

function sqlUpdate($C, $query, $format = false, ...$vars) {
    $stmt = $C->prepare($query);
    if($format) {
        $stmt->bind_param($format, ...$vars);
    }
    if($stmt->execute()) {
        $stmt->close();
        return true;
    }
    $stmt->close();
    return false;
}
function addCricketersData()
{
    $name = $_POST["name"];
    $age = $_POST["age"];
    $imgurl = $_POST["imgurl"];

    $conn = new mysqli("localhost","root","","practice");
    $res = sqlInsert($conn,"insert into cricketers(name,age,imgurl) values(?,?,?)","sss",$name,$age,$imgurl);

    if($res==-1)
    {
        echo json_encode(["status"=>500,"message"=>"Server error while inserting data"]);
        die();
    }
    if($res)
    {
        $res = sqlSelect($conn,"select * from cricketers");
        if($res==false)
        {
            echo json_encode(["status"=>500,"message"=>"Server error while getting data"]);
            die();
        }
        
        $cricketers=[];
        
        while($row=$res->fetch_assoc())
        {
            $cricketers[] = $row;
        }
        echo json_encode(["status"=>200,"cricketersdata"=>$cricketers]);
    }
}

function sendCricketersData()
{
    $conn = new mysqli("localhost","root","","practice");
    $res = sqlSelect($conn,"select * from cricketers");
    if($res==false)
    {
        echo json_encode(["status"=>500,"message"=>"Server error while getting data"]);
        die();
    }
    
    $cricketers=[];
    
    while($row=$res->fetch_assoc())
    {
        $cricketers[] = $row;
    }
    echo json_encode(["status"=>200,"cricketersdata"=>$cricketers]);
}
?>
