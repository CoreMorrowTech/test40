#!/bin/bash

# 确保当前分支是最新的
git pull

# 添加所有文件到Git
git add .

# 提交更改
git commit -m "更新应用"

# 推送到GitHub
git push origin main

echo "部署完成！"