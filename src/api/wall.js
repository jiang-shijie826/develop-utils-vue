import request from '@/http/axios'

// 获取留言/照片
export function getWall(data) {
    return request({
        url: '/findWallPage',
        method: "POST",
        data
    })
}

// 获取评论
export function getComment(data) {
    return request({
        url: '/findCommentPage',
        method: "POST",
        data
    })
}

// 获取ip地址
export function getIp() {
    return request({
        url: '/signip',
        method: "POST"
    })
}

// 新建留言
export function addMessage(data) {
    return request({
        url: '/insertWall',
        method: "POST",
        data
    })
}

// 反馈
export function feedback(data) {
    return request({
        url: '/insertFeedback',
        method: "POST",
        data
    })
}

// 新建评论
export function addComment(data) {
    return request({
        url: '/insertComment',
        method: "POST",
        data
    })
}

// 上传图片
export function uploadImg(data) {
    return request({
        url: '/upload/image',
        method: "POST",
        data
    })
}