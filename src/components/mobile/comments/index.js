import { useTranslation } from "react-i18next";
import { Button, TextArea, Popup } from "antd-mobile";
import { useState } from "react";
import "./index.scss";

export const Comments = (props) => {
  const { commentsList } = props;
  const { t, i18n } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);
  let [commentText, setCommentText] = useState("");
  const [emlNodes, setEmlNodes] = useState([]);
  const [attachments, setAttachments] = useState([]);
  /**
   * 打开编辑评论内容弹窗
   */
  const openPopup = () => {
    setShowPopup(true);
    setCommentText("");
    setEmlNodes([]);
    setAttachments([]);
  };
  /**
   * 删除对应邮件接收人
   * @param index
   */
  const deleteNode = (index) => {
    emlNodes.splice(index, 1);
    setEmlNodes(emlNodes);
  };
  /**
   * 打开邮件接收人选择器
   */
  const openPicker = () => {};
  return (
    <div className="comment">
      <div className="flex-between">
        <p className="comment-title font-PF-medium">{`${t(
          "normalLang.addComments"
        )}（${commentsList.length}）`}</p>
        <Button
          shape="rounded"
          size="small"
          fill="solid"
          className="comment-button"
          style={{ "--background-color": "#E1F0FF", "--text-color": "#1890FF" }}
          onClick={() => openPopup()}
        >
          {t("normalLang.addComments")}
        </Button>
      </div>
      {commentsList.length === 0 && <p className="fz-28">暂无评论</p>}
      {commentsList.map((item) => {
        return (
          <div key={item.id}>
            <img
              className="comment-detail-img"
              src={decodeURIComponent(item.cosResourceUrl)}
            />
            <div>
              <p className="detail-name">{item.empname}</p>
              <p className="detail-content">{item.contents}</p>
              <div className="detail-upload">
                {/*<upload-attachment
                                v-if="item.attachments.length > 0"
                            :is-upload="false"
                            :attachments="item.attachments"
                             class="margin-upload"
                        />*/}
              </div>
              <div className="node-list">
                已邮件同步人：
                {item.Recipients.map((item1) => {
                  return (
                    <p key={item1.id} className="node-list-name">
                      {item1.name}
                    </p>
                  );
                })}
              </div>
              <p className="node-time">{item.updatetime}</p>
            </div>
          </div>
        );
      })}
      <Popup
        visible={showPopup}
        onClose={() => {
          setShowPopup(false);
        }}
        showCloseButton
        position="left"
        className="comment-popup"
        bodyStyle={{ width: "100vw" }}
      >
        <div className="comment-popup-input">
          <TextArea
            placeholder="请输入内容"
            value={commentText}
            onChange={(val) => {
              setCommentText(val);
            }}
            placehodler={t("normalLang.pleaseInputContent")}
            autoSize={{ minRows: 3 }}
            style={{ "--font-size": "0.28rem" }}
          />
        </div>
        {/*附件*/}
        <div className="comment-popup-upload"></div>
        {i18n.language === "zhCN" && (
          <div className="comment-eml">
            <p className="comment-node-title">邮件查收节点</p>
            <div className="comment-eml-info" onClick={() => openPicker()}>
              {emlNodes.length === 0 ? (
                <p className="comment-eml-tip">请选择需查收邮件节点</p>
              ) : (
                <div className="node-list">
                  {emlNodes.map((item) => (
                    <Tag
                      className="node-name"
                      onClick={() => deleteNode(index)}
                      key={item.caid}
                      round
                      color="#e1f0ff"
                      style={{ "--text-color": "#1890FF" }}
                    >
                      {item.name}
                    </Tag>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};
