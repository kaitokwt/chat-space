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
|user  |references|null: false, foreign_key: true|
|group |references|null: false, foreign_key: true|

### Assocation
be_longs :user
be_longs :group

## messagesテーブル

|column|type|options|
|------|----|-------|
|body  |text|       |
|image |string|     |
|user  |references|null: false, foreign: true|
|group |references|null: false, foreign: true|

### Assocation
belongs_to :user
belongs_to :group