const { decryptMedia, Client } = require('@open-wa/wa-automate')
const config = require('../config.json')


module.exports = msgHandler = async (client =  new Client(), message) => {
    try {
        const { type, id, fromMe, from, t, sender, buttons, selectedButtonId, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, chatId, mentionedJidList, author } = message
        let { body } = message
        const cmd = caption || body || ''
        const command = cmd.toLowerCase().split(' ')[0] || ''
        const chats = (type === 'chat') ? body : ((type === 'image' || type === 'video')) ? caption : ''
        //untuk #perfix
        const args = body.trim().split(/ +/).slice(1)
        const q = args.join(' ')

        // validator
        const prefix = /^[°•π÷×¶∆£¢€¥®™✓=|~!#$%^&./\\©^]/.test(command) ? command.match(/^[°•π÷×¶∆£¢€¥®™✓=|~!#$%^&./\\©^]/gi) : '-' 
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
        const isQuotedGif = quotedMsg && quotedMsg.mimetype === 'image/gif'
        const isImage = type === 'image'
        const isVideo = type === 'video'
        const isGif = mimetype === 'image/gif'
        const uaOverride = config.uaOverride

        //util
        const { weeaboo, fun} = require('../lib')
        



        switch (command) {

            // case '͏͏͏͏͏͏͏͏͏͏': 
            //     await client.reply(from, 'Hai Tes '+command, id)

            // break
            // case '͏͏͏͏͏͏͏͏͏': 
            //     await client.reply(from, 'Hai Tes2 '+command, id)

            // break


            case 'Menu':
            case 'menu':
                case '#menu':
                case '#Menu':
                case '#help':
                await client.reply(from, 'Menu Hanya Bisa Di Aplikasi ini \nhttps://play.google.com/store/apps/details?id=com.indobot.botwastikerapp \n\nhanya 4mb', id)

            break

            case 'hallo': 
                await client.reply(from, 'Hai '+command, id)

            break

            case 'stiker':
            case 'sticker':
            case '͏͏͏͏͏͏͏͏͏͏': 
                if (isMedia && isImage || isQuotedImage) {
                    await client.reply(from, 'Wait.. ', id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    await client.sendImageAsSticker(from, imageBase64, { author: "No Bot Wa", pack: "085158870125" })
                    console.log(`Sticker processed  seconds`)
                } else {
                    await client.reply(from, "gagal", id)
                }
            break

            case 'sgif':
            case 'sgif':
            case '͏͏͏͏͏͏͏͏͏': 
                await client.reply(from, 'Wait.. ', id)
                if (isMedia && isVideo || isGif || isQuotedVideo || isQuotedGif) {
                    try {
                        const encryptMedia = isQuotedGif || isQuotedVideo ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const _mimetype = isQuotedVideo || isQuotedGif ? quotedMsg.mimetype : mimetype
                    const videoBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    await client.sendMp4AsSticker(from, videoBase64, null, { stickerMetadata: true, author: "No Bot Wa", pack: "085158870125", keepScale: true, fps: 30, startTime: '00:00:00.0', endTime : '00:00:05.0', crop: false, loop: 0 })
                            .then(() => {
                                console.log(` seconds`)
                            })
                    } catch (err) {
                        console.error(err)
                        await client.reply(from," Gagal Cari Video Lain Maximal 5 detik", id)
                    }
                } else {
                    await client.reply(from, "Gunakan Sesuai Menu", id)
                }
                const allChats = await client.getAllChats()
                for (let delChats of allChats) {
                    await client.deleteChat(delChats.id)
                }
            break

            case 'bc':
                if (!q) return await client.reply(from, "ind.emptyMess()", id)
                const chats = await client.getAllChatIds()
                for (let bcs of chats) {
                    let cvk = await client.getChatById(bcs)
                    if (!cvk.isReadOnly) await client.sendText(bcs, `${q}\n\n- \n_Broadcasted message_`)
                }
                await client.reply(from, "ind.doneOwner()", id)
            break

            case 'clearall':
                // const allChats = await client.getAllChats()
                for (let delChats of allChats) {
                    await client.deleteChat(delChats.id)
                }
                
            break
            case 'cl':
                await client.clearAllChats()
            break

            case 'doge':
                fun.doge()
                    .then(async (body) => {
                        const dogeg = body.split('\n')
                        const dogegx = dogeg[Math.floor(Math.random() * dogeg.length)]
                        await client.sendStickerfromUrl(from, dogegx, null, { author: "authorWm", pack: "packWm" })
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await client.reply(from, 'Error!', id)
                    })
            break
            


        }

    } catch (err){
        console.error('error', err)
    }
}
