import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Space,
  Row,
  Col,
  Radio
} from "antd";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addPerson,
  updatePerson,
  setEditingPerson
} from "../../store/slices/formSlice";
import "./style.scss";
import { useTranslation } from "react-i18next";

interface FormValues {
  title: string;
  firstname: string;
  lastname: string;
  birthday: dayjs.Dayjs;
  nationality: string;
  citizenID: string[];
  gender: string;
  mobilePhone: string;
  passportNo: string;
  expectedSalary: string;
  countryCode: string;
}

const FormComponent: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);
  const editingPerson = useAppSelector((state) => state.form.editingPerson);
  const { t } = useTranslation();

  useEffect(() => {
    if (editingPerson) {
      form.setFieldsValue({
        ...editingPerson,
        birthday: dayjs(editingPerson.birthday),
        citizenID: editingPerson.citizenID.split("-"),
        mobilePhone: editingPerson.mobilePhone
          ? editingPerson.mobilePhone.slice(5)
          : "",
        countryCode: editingPerson.mobilePhone
          ? editingPerson.mobilePhone.slice(0, 4)
          : "+66"
      });
      setIsEdit(true);
      setEditId(editingPerson.id);
    }
  }, [editingPerson, form]);

  const onFinish = (values: FormValues) => {
    const personData = {
      ...values,
      id: isEdit && editId ? editId : Date.now(),
      birthday: values.birthday?.toISOString(),
      citizenID: values.citizenID.join("-"),
      mobilePhone: `${values.countryCode}${values.mobilePhone}`
    };

    if (isEdit) {
      dispatch(updatePerson(personData));
    } else {
      dispatch(addPerson(personData));
    }

    form.resetFields();
    setIsEdit(false);
    setEditId(null);
    dispatch(setEditingPerson(null));
  };

  return (
    <div className="form-container">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col>
            <Form.Item
              name="title"
              label={t("form.title")}
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="Mr.">{t("form.mr")}</Select.Option>
                <Select.Option value="Mrs.">{t("form.mrs")}</Select.Option>
                <Select.Option value="Ms.">{t("form.miss")}</Select.Option>
                <Select.Option value="other">{t("form.other")}</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="firstname"
              label={t("form.firstname")}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="lastname"
              label={t("form.lastname")}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>{" "}
          </Col>
        </Row>
        <Row gutter={16}>
          <Col>
            <Form.Item
              name="birthday"
              label={t("form.birthday")}
              rules={[{ required: true }]}
            >
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="nationality"
              label={t("form.nationality")}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label={t("form.citizenID")} required>
          <Space.Compact>
            {Array.from({ length: 5 }).map((_, index) => (
              <Form.Item
                name={["citizenID", index]}
                noStyle
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            ))}
          </Space.Compact>
        </Form.Item>

        <Form.Item
          name="gender"
          label={t("form.gender")}
          rules={[{ required: true }]}
        >
          <Radio.Group>
            <Radio value="Male">{t("form.male")}</Radio>
            <Radio value="Female">{t("form.female")}</Radio>
            <Radio value="Unisex">{t("form.unisex")}</Radio>
          </Radio.Group>
        </Form.Item>

        <div className="tel-form">
          <Form.Item name="countryCode" label={t("form.mobilePhone")} rules={[{ required: true }]}>
            <Select defaultValue="+66" style={{ width: 80 }}>
              <Select.Option value="+66">+66</Select.Option>
              <Select.Option value="+1">+1</Select.Option>
              <Select.Option value="+44">+44</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="mobilePhone"  rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </div>
        <Form.Item name="passportNo" label={t("form.passportNo")}>
          <Input />
        </Form.Item>
        <Form.Item
          name="expectedSalary"
          label={t("form.expectedSalary")}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button
            type="default"
            onClick={() => {
              form.resetFields();
              setIsEdit(false);
              setEditId(null);
              dispatch(setEditingPerson(null));
            }}
            style={{ marginLeft: "10px" }}
          >
            {t("form.reset")}
          </Button>
          <Button type="primary" htmlType="submit">
            {isEdit ? t("form.update") : t("form.submit")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormComponent;
