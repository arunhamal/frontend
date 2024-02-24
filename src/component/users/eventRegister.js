import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import { Button, Card, Col, Form, Input, Row, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getLocalStorage } from "../../shared/Common";
import { post } from "../../utils/HTTPUtils";
import { useLocation, useNavigate } from "react-router-dom";
const EventRegisterForm = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formItemProps = {
    wrapperCol: { xs: 24 },
    labelCol: { xs: 24 },
    labelAlign: "left",
    className: "mb-md-3 mb-1",
  };

  useEffect(() => {
    form.setFieldsValue({phone_number: getLocalStorage('user-phone-no')})
    form.setFieldsValue({email: getLocalStorage('user-email')})
    form.setFieldsValue({player1: getLocalStorage('user-name')})
  }, [])
  const onFinish = (values) => {
    const formData = {
        ...values,
        ...location.state,
        user_id: getLocalStorage('user-id')
    }
    setLoading(true)
    post('/event/web/register', formData).then((res) => {
        setLoading(false)
        message.success('Event Registered.')
        navigate('/')
    }).catch((err) => {
        message.error(err?.response?.data?.message)
        setLoading(false)
    })
    
  };
  return (
    <>
      <Navbar />
      <Form onFinish={onFinish} form={form}>
        <Card className="container mt-5" title="Register Event">
          <Row gutter={24}>
            <Col xs={24} md={24} lg={8} xl={6}>
              <Form.Item
                {...formItemProps}
                name={"team_name"}
                label={"Team Name"}
                rules={[{ required: true, message: "Required" }]}
              >
                <Input placeholder="Team Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8} xl={6}>
              <Form.Item
                {...formItemProps}
                name={"player1"}
                label={"Player1 Name"}
                rules={[{ required: true, message: "Required" }]}
              >
                <Input placeholder="Player1 Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8} xl={6}>
              <Form.Item
                {...formItemProps}
                name={"profile1"}
                label={"Profile1"}
                rules={[{ required: true, message: "Required" }]}
              >
                <Upload
                  action="https://thefutsalpro-backend.onrender.com/upload"
                  style={{ width: "100%" }}
                  onChange={(info) => {
                    if (info?.file?.status === "done") {
                      form.setFieldsValue({
                        profile1: info?.file?.response?.url,
                      });
                    }
                  }}
                >
                  <Button style={{ width: "100%" }} icon={<UploadOutlined />}>
                    Upload
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8} xl={6}>
              <Form.Item
                {...formItemProps}
                name={"player2"}
                label={"Player2 Name"}
                rules={[{ required: true, message: "Required" }]}
              >
                <Input placeholder="Player2 Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8} xl={6}>
              <Form.Item
                {...formItemProps}
                name={"profile2"}
                label={"Profile2"}
                rules={[{ required: true, message: "Required" }]}
              >
                <Upload
                  action="https://thefutsalpro-backend.onrender.com/upload"
                  style={{ width: "100%" }}
                  onChange={(info) => {
                    if (info?.file?.status === "done") {
                      form.setFieldsValue({
                        profile2: info?.file?.response?.url,
                      });
                    }
                  }}
                >
                  <Button style={{ width: "100%" }} icon={<UploadOutlined />}>
                    Upload
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8} xl={6}>
              <Form.Item
                {...formItemProps}
                name={"player3"}
                label={"Player3 Name"}
                rules={[{ required: true, message: "Required" }]}
              >
                <Input placeholder="Player3 Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8} xl={6}>
              <Form.Item
                {...formItemProps}
                name={"profile3"}
                label={"Profile3"}
                rules={[{ required: true, message: "Required" }]}
              >
                <Upload
                  action="https://thefutsalpro-backend.onrender.com/upload"
                  style={{ width: "100%" }}
                  onChange={(info) => {
                    if (info?.file?.status === "done") {
                      form.setFieldsValue({
                        profile3: info?.file?.response?.url,
                      });
                    }
                  }}
                >
                  <Button style={{ width: "100%" }} icon={<UploadOutlined />}>
                    Upload
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8} xl={6}>
              <Form.Item
                {...formItemProps}
                name={"player4"}
                label={"Player4 Name"}
                rules={[{ required: true, message: "Required" }]}
              >
                <Input placeholder="Player4 Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8} xl={6}>
              <Form.Item
                {...formItemProps}
                name={"profile4"}
                label={"Profile4"}
                rules={[{ required: true, message: "Required" }]}
              >
                <Upload
                  action="https://thefutsalpro-backend.onrender.com/upload"
                  style={{ width: "100%" }}
                  onChange={(info) => {
                    if (info?.file?.status === "done") {
                      form.setFieldsValue({
                        profile4: info?.file?.response?.url,
                      });
                    }
                  }}
                >
                  <Button style={{ width: "100%" }} icon={<UploadOutlined />}>
                    Upload
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8} xl={6}>
              <Form.Item
                {...formItemProps}
                name={"player5"}
                label={"Player5 Name"}
                rules={[{ required: true, message: "Required" }]}
              >
                <Input placeholder="Player5 Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8} xl={6}>
              <Form.Item
                {...formItemProps}
                name={"profile5"}
                label={"Profile5"}
                rules={[{ required: true, message: "Required" }]}
              >
                <Upload
                  action="https://thefutsalpro-backend.onrender.com/upload"
                  style={{ width: "100%" }}
                  onChange={(info) => {
                    if (info?.file?.status === "done") {
                      form.setFieldsValue({
                        profile5: info?.file?.response?.url,
                      });
                    }
                  }}
                >
                  <Button style={{ width: "100%" }} icon={<UploadOutlined />}>
                    Upload
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8} xl={6}>
              <Form.Item
                {...formItemProps}
                name={"player6"}
                label={"Player6 Name"}
              >
                <Input placeholder="Player6 Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8} xl={6}>
              <Form.Item
                {...formItemProps}
                name={"profile6"}
                label={"Profile6"}
              >
                <Upload
                  action="https://thefutsalpro-backend.onrender.com/upload"
                  style={{ width: "100%" }}
                  onChange={(info) => {
                    if (info?.file?.status === "done") {
                      form.setFieldsValue({
                        profile6: info?.file?.response?.url,
                      });
                    }
                  }}
                >
                  <Button style={{ width: "100%" }} icon={<UploadOutlined />}>
                    Upload
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8} xl={6}>
              <Form.Item
                {...formItemProps}
                name={"player7"}
                label={"Player7 Name"}
              >
                <Input placeholder="Player7 Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8} xl={6}>
              <Form.Item
                {...formItemProps}
                name={"profile7"}
                label={"Profile7"}
              >
                <Upload
                  action="https://thefutsalpro-backend.onrender.com/upload"
                  style={{ width: "100%" }}
                  onChange={(info) => {
                    if (info?.file?.status === "done") {
                      form.setFieldsValue({
                        profile7: info?.file?.response?.url,
                      });
                    }
                  }}
                >
                  <Button style={{ width: "100%" }} icon={<UploadOutlined />}>
                    Upload
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8} xl={6}>
              <Form.Item
                {...formItemProps}
                name={"email"}
                label={"Email"}
                rules={[{ required: true, message: "Required" }]}
              >
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8} xl={6}>
              <Form.Item
                {...formItemProps}
                name={"phone_number"}
                label={"Phone Number"}
                rules={[{ required: true, message: "Required" }]}
              >
                <Input value={getLocalStorage('user-phone-no')} placeholder="Phone Number" />
              </Form.Item>
            </Col>
          </Row>
          <Button loading={loading} className="mt-3" htmlType="submit">Submit</Button>
        </Card>
      </Form>
    </>
  );
};

export default EventRegisterForm;
