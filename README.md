# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## usersテーブル

|column|type|options|
|------|----|-------|
|name  |string|null: false, unique: true, index: true|
|email |text|null: false, unique: true|
|password|string|null: false|

### Assocation
has_many :messages
has_many :groups_users
has_many :groups, through: :groups_users

## groupsテーブル

|column|type|options|
|------|----|-------|
|name  |string|null: false|

### Assocation
has_many :messages
has_many :groups_users
has_many :users, through: :groups_users

## groups_usersテーブル

|column|type|options|
|------|----|-------|
|id    |integer|null: false, unique: true|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Assocation
be_longs user
be_longs group
be_longs message

## messagesテーブル

|column|type|options|
|------|----|-------|
|id    |integer|null: false, unique: true|
|body  |text|null: false|
|image |string|     |
|groups_user_id|integer|null: true, foreign: true|

### Assocation
has_many groups_users