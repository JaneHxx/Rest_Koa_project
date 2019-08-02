const ArticleModel = require("../models/article");

class articleController {
    /**
     * 创建文章
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx){
        //接收客服端
        let req = ctx.request.body;
        console.log('req = ' + req.title);
        if(req.title && req.author && req.content && req.category){
            try{
                //创建文章模型
                const ret = await ArticleModel.createArticle(req);
                //使用刚刚创建的文章ID查询文章详情，且返回文章详情信息
                const data = await ArticleModel.getArticleDetail(ret.id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '创建文章成功',
                    data
                }
            }catch(err){
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '创建文章失败',
                    data: err
                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '参数不齐全'
            }
        }
    }

    /**
     * 获取文章详情
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async detail(ctx){
        let id = ctx.params.id;
        console.log('ctx.params = ' + ctx.params);
        if(id){
            try{
                // 查询文章详情模型
                let data = await ArticleModel.getArticleDetail(id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '查询成功',
                    data
                }
            }catch(err){
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '查询失败',
                    data
                }
            }
        }else {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '文章ID必须传'
            }
        }
    }

    static async list (ctx) {
        try {
            let list = await ArticleModel.getArticleList();
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '查询成功',
                list
            }
        } catch (e) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                msg: '查询失败'
            };
        }
    }
}

module.exports = articleController;