# README

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false|
|password|string|null: false|
### Association
- has_many :messages
- has_many :groups_users
- has_many :groups, through: :groups_users



## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false|
|users_id|integer|null: false, foreign_key: true|
### Association
- has_many :groups_users
- has_many :users, through: :groups_users
- has_many :messages



## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user


## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|string|null: false|
|image|string||
|users_id|integer|null: false foreign_key: true|
|groups_id|integer|null: false foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

