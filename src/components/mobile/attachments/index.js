const Attachment = ({}) => {
  return (
    <div>
      <input
        class="el-upload__input"
        type="file"
        ref="input"
        name={name}
        on-change={handleChange}
        multiple={multiple}
        accept={accept}
      ></input>
    </div>
  );
};

export default Attachment;
