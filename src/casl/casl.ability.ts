import { defineAbility, AbilityBuilder, Ability, buildMongoQueryMatcher } from '@casl/ability'


export default (user: any) => {
  const rules = [
    {
      action: 'read',
      subject: 'Post'
    },
    {
      action: 'update',
      subject: 'Post',
      fields: ['title'],
      conditions: { userId: user.id}
    }
  ];

  if(user.isVerified) {
    rules.push({
      action: 'update',
      subject: 'Post',
      fields: ['status'],
      conditions: {
        userId: user.id
      }
    })
  }

  return new Ability(rules);
}


// export default (user: any) => {
//   const {can, cannot, build} = new AbilityBuilder(Ability);

//   can('read', 'Post',{status: 'published'}); // 定义用户可以读取 Post 状态是 published 的权限
//   can('update', 'Post', ['title'],{ userId: user.id}) // 用户可以更新自己发布的 post 的 title 字段的值

//   if(user.isVerified) { // 只有通过验证的用户可以更新自己发布的 post 下 的 status 字段
//     can('update', 'Post', ['status'], { userId: user.id })
//   }
  
//   return build();
// }







// /**
//  * 定义用户能做什么，不能做什么
//  * 这里定义用户可以做应用里的任何事情，就是不能删除用户
//  */
// export default (user: any) =>
//  defineAbility((can, cannot) => {
//   can('read', 'Post',{status: 'published'}); // 定义用户可以读取 Post 状态是 published 的权限
//   can('update', 'Post', ['title'],{ userId: user.id}) // 用户可以更新自己发布的 post 的 title 字段的值

//   if(user.isVerified) { // 只有通过验证的用户可以更新自己发布的 post 下 的 status 字段
//     can('update', 'Post', ['status'], { userId: user.id })
//   }


//   // can('manage','all');
//   // cannot('delete', 'User');
// })





