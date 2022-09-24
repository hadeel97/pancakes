import { Table, Popconfirm, InputNumber} from 'antd';
import {Form} from 'antd';


export const IntakeInfoTable = ({meals, mealType, updateInfo}) => {


  //delete foodComp 

  async function deleteFoodComp(id){
    try{
      await fetch(`http://localhost:8000/dashboard/foodComp/${id}`, 
      {
        method:"DELETE",
        headers: {"Content-Type":"application/json", 
        jwt_token: localStorage.getItem("token")}
      })
     
    }
    catch(err){
      console.error(err.message)

    }
  };

    const columns = [{
        title: 'Food',
        dataIndex: 'fname',
        width: 100,
        
      },{
        title: 'Calories',
        dataIndex: 'cal',
        width: 100,

      },{
        title: 'Carbs',
        dataIndex: 'carb',
        width: 100,
      },
      {
        title: 'Fats',
        dataIndex: 'fat',
        width: 100,
      },
      {
        title: 'Protein',
        dataIndex: 'protein',
        width: 100,
      },
      {
        title: 'Serving',
        dataIndex: 'serving',
        width: 100,
        render:(grams)=>(
          <Form style={{border: "none"}} initialValues={{grams: grams}}>
              <Form.Item noStyle name={"grams"}>
                <InputNumber/>
              </Form.Item>
              {/* <Button type='btn btn-primary custom-btn2' style={{width: "60px", height: "30px"}}>grams</Button> */}
          </Form>
        )
      },
      {
        title: '   ',
        dataIndex: 'operation',
        width: 100,
        render: (_, record) =>
          meals?.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={()=> deleteFoodComp(record.id).then(res=>{
              updateInfo(prev => ({...prev , [mealType]: prev[mealType]?.filter(m => m.id !== record.id)}))
            })}>
               <tr key ={record.id}>
                <button type="button" className="Delete" id='Delete'>Delete</button>
               </tr>
            </Popconfirm>
          ) : null,
      },]


    return(  <Table className='meal-text'
        rowClassName={() => 'editable-row'}
        pagination={false}
        dataSource={meals}
        columns={columns}/>
        );


}