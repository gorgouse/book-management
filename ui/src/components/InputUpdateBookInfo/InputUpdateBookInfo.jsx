import './index.css';
import { Input, Row, Col } from 'antd';

function InputUpdateBookInfo(
    {
        isDetail,
        updateId,
        updateBookList,
        setUpdateBook,
        name,
        label,
        value,
        updateBookInfoChange
    }
) {
    const handleUpdateBookInfoChange = (e) => {
        updateBookInfoChange(e, updateId, name, updateBookList, setUpdateBook)
    }

    return (
        <Row className='input-wrap' gutter={16}>
            <Col className="gutter-row" span={5}>
                <div className='input-label'>{label}:</div>
            </Col>
            <Col className="gutter-row" span={4}>
                {
                    isDetail ? <Input disabled className='form-input' placeholder="input title" value={value} />
                        : <Input className='form-input' placeholder={"input "+name} value={value} onChange={handleUpdateBookInfoChange} />
                }
            </Col>
        </Row>
    )

}

export default InputUpdateBookInfo;