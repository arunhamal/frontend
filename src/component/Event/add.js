import React, { useEffect, useMemo, useState } from "react";
import {
  Breadcrumb,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Upload,
  message,
} from "antd";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { UploadOutlined } from "@ant-design/icons";
import { post } from "../../utils/HTTPUtils";

const AddEvent = ({ navigate }) => {
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
          const res = await post(`/event/update-request`, { id: id });
          if (res?.status === 200) {
            form.setFieldsValue(res?.data?.res?.[0]);
            form.setFieldsValue({
              start_date: dayjs(res?.data?.res?.[0]?.start_date),
            });
            form.setFieldsValue({
              end_date: dayjs(res?.data?.res?.[0]?.end_date),
            });
            form.setFieldsValue({
              file: res?.data?.res?.[0]?.event_img,
            });
            setData(res?.data?.res?.[0]);
          }
        } catch (error) {
          console.error("Error fetching event data:", error);
        }
      };

      fetchData();
    } else {
      setEditMode(false);
    }
  }, [id]);

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
          form.setFieldsValue({ file: res?.data?.url });
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

  const onFinish = (values) => {
    if (editMode) {
      values.id = data?._id;
      values.event_img = values?.file;
      post("/event/update", values).then((res) => {
        navigate("/event");
      });
    } else {
      post("/event", values).then((res) => {
        navigate("/event");
      });
    }
  };
  return (
    <>
      <Breadcrumb className="text-right mb-5" style={{ cursor: "pointer" }}>
        <Breadcrumb.Item onClick={() => navigate("/dashboard")}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => navigate("/event")}>
          Event
        </Breadcrumb.Item>
        <Breadcrumb.Item>{editMode ? "Edit" : "Add"}</Breadcrumb.Item>
      </Breadcrumb>
      <Form onFinish={onFinish} form={form}>
        <Row gutter={24}>
          <Col xs={24} md={24} lg={20} xl={16}>
            <Form.Item
              {...formItemLayout}
              name={"event_name"}
              label={"Event Name"}
              rules={[{ required: true }]}
            >
              <Input placeholder="Event Name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={20} xl={16}>
            <Form.Item
              {...formItemLayout}
              name={"futsal_name"}
              label={"Futsal Name"}
              rules={[{ required: true }]}
            >
              <Input placeholder="Futsal Name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={20} xl={16}>
            <Form.Item
              {...formItemLayout}
              name={"start_date"}
              label={"Start Date"}
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: "100%" }} placeholder="Start Date" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={20} xl={16}>
            <Form.Item
              {...formItemLayout}
              name={"end_date"}
              label={"End Date"}
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: "100%" }} placeholder="End Date" />
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
              name={"file"}
              label={"Event Image"}
              rules={[{ required: true }]}
            >
              <Upload {...uploadProps} fileList={fileList}>
                <Button style={{ width: "100%" }} icon={<UploadOutlined />}>
                  Upload
                </Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Button htmlType="submit">Submit</Button>
      </Form>
    </>
  );
};

export default AddEvent;
