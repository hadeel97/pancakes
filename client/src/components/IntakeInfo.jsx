import { Table, Popconfirm} from 'antd';
import 'antd/dist/antd.css'

export const IntakeInfoTable = ({meals}) => {

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
        
        dataIndex: 'operation',
        render: (_, record) =>
          meals?.length >= 1 ? (
            <Popconfirm title="Sure to delete?">
            {/* //  onConfirm={() => handleDelete(record.key)}>
            //   <a>Delete</a> */}
            </Popconfirm>
          ) : null,
      },]


    return(  <Table style={{backgroundColor : " rgb(47, 8, 55)"}}
        rowClassName={() => 'editable-row'}
        pagination={false}
        dataSource={meals}
        columns={columns}/>
        );


}