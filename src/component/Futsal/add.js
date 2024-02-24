import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  TimePicker,
  Upload,
  message,
} from "antd";
import React, { useEffect, useMemo, useState } from "react";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";

import { post } from "../../utils/HTTPUtils";
import { day } from "../../constant";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const AddFutsal = ({ navigate }) => {
  let formItemLayout = {
    labelCol: { xs: 24, sm: 24, md: 10, lg: 8, xl: 8 },
    wrapperCol: { xs: 24, sm: 24, md: 14, lg: 16, xl: 16 },
    labelAlign: "left",
  };


  const [form] = Form.useForm();
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState();

  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    if (id) {
      setEditMode(true);
      const fetchData = async () => {
        try {
          const res = await post(`/futsal/update-request`, { id: id });
          if (res?.status === 200) {
            form.setFieldsValue(res?.data?.res?.[0]);
            form.setFieldsValue({start_time: dayjs(res?.data?.res?.[0]?.start_time)})
            form.setFieldsValue({end_time: dayjs(res?.data?.res?.[0]?.end_time)})
            setData(res?.data?.res?.[0]);
          }
        } catch (error) {
          console.error("Error fetching futsal data:", error);
        }
      };

      fetchData();
    } else {
      setEditMode(false);
    }
  }, [id]);

  const onFinish = (values) => {
    if (editMode) {
      values.id = data?._id;
      post("/futsal/update", values).then((res) => {
        navigate("/futsal");
      });
    } else {
      post("/futsal/add", values).then((res) => {
        navigate("/futsal");
      });
    }
  };

  const validateFileType = ({ type, name }, allowedTypes) => {
    if (!allowedTypes) {
      return true;
    }
    if (type) {
      return allowedTypes.includes(type);
    }
  };

  const uploadProps = useMemo(
    () => ({
      beforeUpload: (file) => {
        const isAllowedType = validateFileType(file, [
          "image/png",
          "image/jpeg",
        ]);
        if (!isAllowedType) {
          setFileList((state) => [...state]);
          message.error(`${file.name} is not allowed`);
          return false;
        }
        setFileList((state) => [...state, file]);
        const formData = new FormData();
        formData.append("file", file);
        post("/upload", formData).then((res) => {
          form.setFieldsValue({ futsal_img: res?.data?.url });
        });
        return false;
      },
      onRemove: (file) => {
        if (fileList.some((item) => item.uid === file.uid)) {
          setFileList((fileList) =>
            fileList.filter((item) => item.uid !== file.uid)
          );
          return true;
        }
        return false;
      },
    }),
    [fileList]
  );
  return (
    <>
      <Breadcrumb className="text-right mb-5" style={{ cursor: "pointer" }}>
        <Breadcrumb.Item onClick={() => navigate("/dashboard")}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => navigate("/futsal")}>
          Futsal
        </Breadcrumb.Item>
        <Breadcrumb.Item>{editMode ? "Edit" : "Add"}</Breadcrumb.Item>
      </Breadcrumb>
      <Form onFinish={onFinish} form={form}>
        <Row gutter={24}>
          <Col xs={24} md={24} lg={20} xl={16}>
            <Form.Item
              {...formItemLayout}
              name={"name"}
              label={"Name"}
              rules={[{ required: true }]}
            >
              <Input placeholder="Name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={20} xl={16}>
            <Form.Item
              {...formItemLayout}
              name={"address"}
              label={"Address"}
              rules={[{ required: true }]}
            >
              <Input placeholder="Address" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={20} xl={16}>
            <Form.Item
              {...formItemLayout}
              name={"email"}
              label={"Email"}
              rules={[{ required: true }]}
            >
              <Input placeholder="Email" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={20} xl={16}>
            <Form.Item
              {...formItemLayout}
              name={"start_time"}
              label={"Start Time"}
              rules={[{ required: true }]}
            >
              <TimePicker style={{width: '100%'}} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={20} xl={16}>
            <Form.Item
              {...formItemLayout}
              name={"end_time"}
              label={"End Time"}
              rules={[{ required: true }]}
            >
              <TimePicker style={{width: '100%'}} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={20} xl={16}>
            <Form.Item
              {...formItemLayout}
              name={"futsal_img"}
              label={"Futsal Image"}
              rules={[{ required: true }]}
            >
              <Upload {...uploadProps} fileList={fileList}>
                <Button style={{ width: "100%" }} icon={<UploadOutlined />}>
                  Upload
                </Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={20} xl={16}>
            <Form.Item
              {...formItemLayout}
              name={"description"}
              label={"Description"}
              rules={[{ required: true }]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={20} xl={16}>
            <Form.Item
              {...formItemLayout}
              name={"futsal_map"}
              label={"Futsal Map"}
              rules={[{ required: true }]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={20} xl={16}>
            <Form.List name="time_rate">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{
                        display: "flex",
                        marginBottom: 8,
                      }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "timing"]}
                        label="Timing"
                        rules={[
                          {
                            required: true,
                            message: "Required",
                          },
                        ]}
                      >
                        <Input placeholder="Timing" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "rate"]}
                        label={"Rate"}
                        rules={[
                          {
                            required: true,
                            message: "Reuired",
                          },
                        ]}
                      >
                        <Input placeholder="Rate" />
                      </Form.Item>
                      {/**                     <Form.Item
                        {...restField}
                        name={[name, "day"]}
                        label={"Day"}
                        rules={[
                          {
                            required: true,
                            message: "Reuired",
                          },
                        ]}
                        style={{ width: "300px" }}
                      >
                        <Select
                          optionFilterProp="label"
                          allowClear
                          showSearch
                          placeholder="Day"
                          options={day}
                        />
                      </Form.Item>
                       */}
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>
        </Row>
        <Button htmlType="submit">Submit</Button>
      </Form>
    </>
  );
};

export default AddFutsal;
