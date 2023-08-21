import {tweetsData} from './data'
import {v4 as uuid4} from 'uuid'


const feedEl = document.getElementById("feed")

document.addEventListener('click', function (e) {
    if (e.target.dataset.like){
        handleClick(e.target.dataset.like, true, false)
    } else if(e.target.dataset.retweet){
        handleClick(e.target.dataset.retweet, false, true)
    } else if (e.target.dataset.reply) {
        handleReplyClick(e.target.dataset.reply)
    } else if (e.target.id === "tweet-btn") {
        handlTweetBtnClick()

    }
})
function handlTweetBtnClick() {
    const tweetInput = document.getElementById("tweet-input")
    if (tweetInput.value.length > 0) {
        tweetsData.push({
            handle: `@qtn2`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: `${tweetInput.value}`,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: '${uuid4()}',
        })
    }
    tweetInput.value = ''
    render()
}
function handleClick(tweetId, like, retweet) {
    const targetTweetObj = tweetsData.filter(function(tweet) {
        return tweet.uuid === tweetId
    })[0]

    if (like) {
        if (!targetTweetObj.isLiked) {
            targetTweetObj.likes += 1
        } else {
            targetTweetObj.likes -= 1
        }
        targetTweetObj.isLiked = !targetTweetObj.isLiked 
    } else if (retweet) {
        if (!targetTweetObj.isRetweeted) {
            targetTweetObj.retweets += 1
        } else {
            targetTweetObj.retweets -= 1
        }
        targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted 
    }

    render()
}

function handleReplyClick(replyId) {
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

function getFeedHtml() {
    let feedHTML = ""
    tweetsData.forEach(function(tweet) {
        let likeIconClass = ''
        let retweetIconClass = ''
        let replyHTML = ''
        if (tweet.isLiked) {
            likeIconClass = 'liked'
        } else {
            likeIconClass = ''
        }

        if (tweet.isRetweeted) {
            retweetIconClass = 'retweeted'
        } else {
            retweetIconClass = ''
        }

        if (tweet.replies.length > 0) {
            tweet.replies.forEach(function(reply) {
                replyHTML += `
                <div class="tweet-reply">
                    <div class="tweet-inner">
                        <img src="${reply.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${reply.handle}</p>
                                <p class="tweet-text">${reply.tweetText}</p>
                            </div>
                        </div>
                </div>
                `
            })
        }
        feedHTML += `
                <div class="tweet">
                    <div class="tweet-inner">
                        <img src="${tweet.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle"> ${tweet.handle}</p>
                            <p class="tweet-text">${tweet.tweetText}</p>
                            <div class="tweet-details">
                                <span class="tweet-detail">
                                    <i class="fa-regular fa-comment-dots" data-reply = "${tweet.uuid}"></i>
                                    ${tweet.replies.length}
                                </span>
                                <span class="tweet-detail">
                                     <i class="fa-solid fa-heart ${likeIconClass}" data-like = "${tweet.uuid}"></i>
                                    ${tweet.likes}
                                </span>
                                <span class="tweet-detail">
                                    <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet = "${tweet.uuid}"></i>
                                    ${tweet.retweets}
                                </span>
                            </div>   
                        </div>            
                    </div>
                    <div class = "hidden" id="replies-${tweet.uuid}">
                    ${replyHTML}
                    </div>  
                </div>

        `

    })
    return feedHTML
}

getFeedHtml()

function render() {
    feedEl.innerHTML = getFeedHtml()
}

render()

