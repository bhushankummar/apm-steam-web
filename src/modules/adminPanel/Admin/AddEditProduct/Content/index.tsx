import React, { useRef } from "react";
import AppCard from "@crema/components/AppCard";
import ImgUpload from "./ImageUpload";
import AppScrollbar from "@crema/components/AppScrollbar";
import { StyledTextMb } from "./index.styled";
import { Col, Form, Input } from "antd";
import { FileType } from "@crema/types/models/ecommerce/EcommerceApp";
import JoditEditor from "jodit-react";

const config = {
  readonly: false, // all options from https://xdsoft.net/jodit/doc/
  toolbar: true,
  minHeight: 300,
  maxHeight: 500,
  buttons: [
    "bold",
    "strikethrough",
    "underline",
    "italic",
    "|",
    "ul",
    "ol",
    "|",
    "font",
    "|",
    "image",
    "video",
    "table",
    "link",
    "|",
    "align",
    "undo",
    "redo",
    "selectall",
    "cut",
    "|",
    "symbol",
  ],
  uploader: {
    insertImageAsBase64URI: true,
    url: "/api/upload",
    format: "json",
    imagesExtensions: ["jpg", "png", "jpeg", "gif"],
    headers: {
      "X-CSRF-TOKEN": "CSFR-Token",
      Authorization: "Bearer <JSON Web Token>",
    },
    process: function (resp: any) {
      return {
        files: resp.data,
      };
    },
  },
  style: {
    "& .jodit .jodit-status-bar": {
      background: "#29572E",
      color: "rgba(255,255,255,0.5)",
    },
  },
};
type Props = {
  uploadedFiles: FileType[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<FileType[]>>;
};

const ProductContent = ({ uploadedFiles, setUploadedFiles }: Props) => {
  const editor = useRef(null);
  return (
    <Col xs={24} lg={16}>
      <AppScrollbar style={{ height: "700px" }}>
        <AppCard>
          <Form.Item label="Technician Name" name="title">
            <Input placeholder="Technician Name" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <JoditEditor ref={editor} value={""} config={config} />
          </Form.Item>
          <StyledTextMb>Images</StyledTextMb>
          <ImgUpload
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
          />
        </AppCard>
      </AppScrollbar>
    </Col>
  );
};

export default ProductContent;
