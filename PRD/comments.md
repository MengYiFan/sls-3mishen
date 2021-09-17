## **评论（跟帖）系统设计**
```
  为了更好的营造有趣、和谐、独特的社区氛围，加深黏性和趣味性。
```

- **评论交互**
- 在内容展示区，用户都可以做评论操作，如故事、章节、句、弹幕和评论本身
- 根据内容区的所示范围，可将评论形态分：`长评、短评`。如在故事和章节处，可做长评或短评，而在句、弹幕这类就只有短评
- 评论可匿名，也可@好友
- 精彩和常规的评论会展示出来，无帮助的则会被折叠起来，无效的不会显示而会被假删除
- 短评会根据推荐算法来随机出现，亦可通过热门、最新、关注好友、自己做排序/筛选
- 长评则会人工审核通过后，按`热门或最新`排序出现。长篇评论列表可点击进入`全屏沉浸式阅读模式`，类似于图片预览
- 评论本身支持`被表情、赞、踩`等用户评价，亦支持`跟帖、举报`等用户操作
- 热评由发表时间(越长时间，各系数比越低)、支持数、反对数、被跟帖数等权重计算
- 回复评论在原评论下展示，最多展示两条，更多评论则以「查看全部 N条评论」唤起
- 原评论若存在被回复，亦或者本身就是回复某条评论，则会出现「查看回复」的操作。点击后浮窗，原评论会被sticky。若该触发对象是回复某评论，则可视区会滚动到当前回复
- **数据库**
- 一条评论诞生，会先进入`评论池`，通过自动判定（部分人工审核）之后，会被标记为`精彩、常规、无帮助、无效`
- 保存评论的作者ID、内容、评论时间、评论源ID(故事ID/章节ID等)、回复ID(非回复其他评论则为Null)、来源(wx/web/app等)、设备、IP、是否已删、是否已审核、标记枚举(精彩、常规、无帮助、无效)
  - 评论池为待审核状态，审核后会更新标记枚举和是否无效
  - 已删除或无效的均不会展示出来，待审核状态的仅作者自己可见
  - 无效是指没有通过审核的评论

### **名词解释**
| 名词 | 描述 |
| :---- | :----: |
| 评论 | 即对文章、章节等的评论 |
| 评价 | 对已有的评论做点赞、踩等的操作 |
| 评论池 | 其实就是将该条评论的 `isAudit` 置为 0，且仅自己可见 |
| 回复的回复 | 即在评论下的回复被人回复 |
| 表情和赞、踩 | 由于赞、踩是高频且成本相对表情低 |
### **评论**
| 字段 | 类型 | 说明 |
| :---- | :----: | :---- |
| ID | int(11) | NOT NULL AUTO_INCREMENT
| from_uid | int(11) | 评论用户ID |
| content | varchar(255) | NOT NULL |
| created_at | timestamp | NOT NULL DEFAULT CURRENT_TIMESTAMP |
| reply_source | int(11) | 评论源ID(故事ID/章节ID等) |
| platform | varchar(255) | 设备、平台，来源(wx/web/app等) |
| IP | varchar(255) | 当前设备IP, 可空 |
| is_delete | tinyint(1) | unsigned DEFAULT '0' |
| is_audit | tinyint(1) | unsigned DEFAULT '0' |
| label | tinyint(1) | 标记枚举(精彩、常规、无帮助、无效)，默认无效 |
| invalidReason | varchar(255) | 无效原因 |

### **表情互动**
| 字段 | 类型 | 说明 |
| :---- | :----: | :---- |
| ID | int(11) | NOT NULL AUTO_INCREMENT |
| from_uid | int(11) | 评论用户ID |
| to_uid | int(11) | 被评论用户ID |
| comment_id | int(11) | 被回复的评论ID |
| reply_id | int(11) | 被回复的回复ID |
| emoji_id | int(1) | 表情枚举 |
| created_at | timestamp | NOT NULL DEFAULT CURRENT_TIMESTAMP |
| reply_source | int(11) | 评论源ID(故事ID/章节ID等) |
| platform | varchar(255) | 设备、平台，来源(wx/web/app等) |
| IP | varchar(255) | 当前设备IP, 可空 |
| is_delete | tinyint(1) | unsigned DEFAULT '0' |
| UNIQUE KEY| | `UK_commont_emoji` (`from_uid`,`to_uid`, `comment_id`, `reply_id`, `emoji`) |

### **回复**
| 字段 | 类型 | 说明 |
| :---- | :----: | :---- |
| ID | int(11) | NOT NULL AUTO_INCREMENT |
| from_uid | int(11) | 评论用户ID |
| to_uid | int(11) | 被评论用户ID |
| comment_id | int(11) | 被回复的评论ID |
| reply_id | int(11) | 被回复的回复ID |
| content | varchar(255) | NOT NULL |
| created_at | timestamp | NOT NULL DEFAULT CURRENT_TIMESTAMP |
| reply_source | int(11) | 评论源ID(故事ID/章节ID等) |
| platform | varchar(255) | 设备、平台，来源(wx/web/app等) |
| IP | varchar(255) | 当前设备IP, 可空 |
| isDelete | tinyint(1) | unsigned DEFAULT '0' |
| isAudit | tinyint(1) | unsigned DEFAULT '0' |
| label | tinyint(1) | 标记枚举(精彩、常规、无帮助、无效)，默认无效 |
| invalidReason | varchar(255) | 无效原因 |