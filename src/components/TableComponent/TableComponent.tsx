/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Table, Button, Pagination, Checkbox } from "antd";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { deletePerson, setEditingPerson } from "../../store/slices/formSlice";
import "./style.scss";
import { useTranslation } from "react-i18next";
import useLanguage from "../../hooks/useLanguage";

const TableComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const people = useAppSelector((state) => state.form.people);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 2;
  const { t } = useTranslation();
  useLanguage();

  const columns = [
    {
      title: t("table.name"),
      dataIndex: "firstname",
      key: "firstname",
      sorter: (a: any, b: any) => a.firstname.localeCompare(b.firstname),
      render: (text: string, record: any) =>
        `${record.firstname} ${record.lastname}`
    },
    {
      title: t("table.gender"),
      dataIndex: "gender",
      key: "gender"
    },
    {
      title: t("table.mobilePhone"),
      dataIndex: "mobilePhone",
      key: "mobilePhone"
    },
    {
      title: t("table.nationality"),
      dataIndex: "nationality",
      key: "nationality"
    },
    {
      title: t("table.manage"),
      key: "manage",
      render: (record: any) => (
        <>
          <Button
            type="link"
            onClick={() => {
              handleEdit(record);
            }}
          >
            {t("table.edit")}
          </Button>
          <Button
            type="link"
            danger
            onClick={() => {
              handleDelete(record.id);
            }}
          >
            {t("table.delete")}
          </Button>
        </>
      )
    }
  ];

  const handleEdit = (record: any) => {
    dispatch(setEditingPerson(record));
  };

  const handleDelete = (id: number) => {
    dispatch(deletePerson(id));
  };

  const handleBulkDelete = () => {
    selectedRowKeys.forEach((id) => {
      dispatch(deletePerson(id));
    });
    setSelectedRowKeys([]);
  };

  const onSelectChange = (selectedKeys: any) => {
    setSelectedRowKeys(selectedKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedPeople = people.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Handle "Select All" logic
  const handleSelectAll = (e: any) => {
    if (e.target.checked) {
      const allIds = paginatedPeople.map((person) => person.id);
      setSelectedRowKeys(allIds);
    } else {
      setSelectedRowKeys([]);
    }
  };

  return (
    <div className="table-container">
      <div className="table-controls">
        <div>
          <Checkbox
            onChange={handleSelectAll}
            checked={selectedRowKeys.length === paginatedPeople.length && paginatedPeople.length > 0}
          >
            {t("table.selectAll")}
          </Checkbox>
          <Button
            type="primary"
            danger
            onClick={handleBulkDelete}
            disabled={selectedRowKeys.length === 0}
          >
            {t("table.deleteSelected")}
          </Button>          
        </div>

        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={people.length}
          onChange={handlePageChange}
          showSizeChanger={false}
          showLessItems
          prevIcon={<span>{t("table.prev")}</span>}
          nextIcon={<span>{t("table.next")}</span>}
          className="custom-pagination"
        />
      </div>
      <Table
        columns={columns}
        dataSource={paginatedPeople}
        pagination={false}
        rowSelection={rowSelection}
        rowKey="id"
      />
    </div>
  );
};

export default TableComponent;
