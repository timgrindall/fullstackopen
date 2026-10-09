const { test, expect, beforeEach, describe } = require('@playwright/test')
const blogs = require('./blogs-list')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // Reset database
    await request.post('/api/testing/reset')
    console.log('Test database has been reset')

    // Create user
    await request.post('/api/users', {
      data: {
        name: 'Tim Grindall',
        username: 'merelytimo',
        password: 'OrcaCucumber7'
      }
    })

    // Login to get token
    const loginResponse = await request.post('/api/login', {
      data: {
        username: 'merelytimo',
        password: 'OrcaCucumber7'
      }
    })
    
    const { token } = await loginResponse.json()

    // Insert blogs with token
    for (const blog of blogs) {
      await request.post('/api/blogs', {
        data: blog,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      // console.log(
      //   `Blog ${blog.title} by ${blog.author} added to database`
      // )
    }
    console.log(`${blogs.length} blogs added to database`)

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('link', { name: 'Login' }).click()

    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('link', {name: 'Login'}).click()

      await page.getByLabel('username').fill('merelytimo')
      await page.getByLabel('password').fill('OrcaCucumber7')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Tim Grindall logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('link', {name: 'Login'}).click()

      await page.getByLabel('username').fill('merelytimo')
      await page.getByLabel('password').fill('naketaketa')
      await page.getByRole('button', { name: 'login'}).click()

      await expect(page.getByText('wrong username or password')).toBeVisible()
      await expect(page.getByRole('heading', {name: 'Pala Pala Blogs'})).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach( async ({page}) => {
      await page.getByRole('link', {name: 'Login'}).click()

      await page.getByLabel('username').fill('merelytimo')
      await page.getByLabel('password').fill('OrcaCucumber7')
      await page.getByRole('button', { name: 'login'}).click()

      await expect(page.getByText('Tim Grindall logged in')).toBeVisible()
    })

    test('user can create new blog', async ({page}) => {  
      await page.getByRole('link', { name: 'New Blog'}).click()

      await page.getByLabel('title:').fill('Flickr Blog')
      await page.getByLabel('author:').fill('Flickr')
      await page.getByLabel('url:').fill('http://blog.flickr.net/en')

      await page.getByRole('button', { name: 'create'}).click()

      await expect(page.getByText('Flickr Blog by Flickr added')).toBeVisible()
      await expect(page.locator('li.blog').filter({ hasText: 'Flickr Blog' })).toBeVisible()
    })

    test('user can delete a blog they added', async ({page}) => {
      // create the blog first
      await page.getByRole('link', { name: 'New Blog'}).click()

      await page.getByLabel('title:').fill('Flickr Blog')
      await page.getByLabel('author:').fill('Flickr')
      await page.getByLabel('url:').fill('http://blog.flickr.net/en')
      await page.getByRole('button', { name: 'create'}).click()

      // find and press the "view" button
      const blogItem = page.locator('li.blog').filter({ hasText: 'Flickr Blog'})
      await blogItem.getByRole('link', {name: 'Flickr Blog'}).click()

      // Register handler BEFORE the click that triggers the dialog
      page.once('dialog', dialog => {
        console.log('dialog handled')
        dialog.accept()
      })

      await page.getByRole('button', {name: 'delete'}).click()

      // confirm the blog is deleted
      await expect(page.locator('li.blog').filter({ hasText: 'Flickr Blog' })).not.toBeVisible({ timeout: 5000 })
    })

    test('a created blog can be liked', async ({page}) => {
      // Find the blog by its title, then get the parent li
      const blogItem = page.locator('li.blog').filter({ hasText: 'Canonical string reduction' })
      
      // Click the view button within that blog item
      await blogItem.getByRole('link', { name: 'Canonical string reduction'}).click()

      // Now the details should be visible
      await expect(page.getByText('http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html')).toBeVisible()

      //get the current context
      const blogView = page.locator('div.blog')

      // Get initial likes count
      const initialLikesText = await blogView.locator('.likes-count').textContent()
      const initialCount = Number(initialLikesText)
      console.log(initialCount + " likes before")

      await blogView.getByRole('button', {name: 'like'}).click()
      await expect(blogView.getByText(/\d+ likes/)).toBeVisible()

      // Wait for the DOM to update
      await expect(blogView.locator('.likes-count')).not.toHaveText(String(initialCount))

      // Get updated likes count
      const updatedLikesText = await blogView.locator('.likes-count').textContent()
      const updatedCount = Number(updatedLikesText)
      console.log(updatedCount + " likes after")

      // Verify it increased
      console.log("Likes increased by:", updatedCount - initialCount)
    })

    test('only the user who added the blog sees the blog\'s delete button', async ({page}) => {
      // create a blog
      await page.getByRole('link', {name: 'New Blog'}).click()

      const blogForm = page.locator('div.blog-form')
      await blogForm.getByLabel('title:').fill('Flickr Blog')
      await blogForm.getByLabel('author:').fill('Flickr')
      await blogForm.getByLabel('url:').fill('http://blog.flickr.net/en')

      await blogForm.getByRole('button', {name: 'create'}).click()

      // wait for DOM to update and confirm blog was created
      const blogItem = page.locator('li.blog').filter({ hasText: 'Flickr Blog'})
      await expect(page.getByText('Flickr Blog by Flickr added')).toBeVisible()
      await expect(blogItem).toBeVisible()

      // log out
      await page.getByRole('button', {name: 'logout'}).click()
      await expect(page.getByRole('link', {name: 'login'})).toBeVisible()

      // try to delete the blog
      await blogItem.getByRole('link', {name: 'Flickr Blog'}).click()

      await expect(page.locator('div.blog')).toBeVisible()

      // confirm delete button is not visible
      await expect(page.locator('div.blog').getByRole('button', { name: 'delete' })).not.toBeVisible()
    })

    // test('blogs are ordered according to likes in descending order', async ({page}) => {
    //   const blogItems = page.locator('li.blog')

    //   await expect(blogItems.first()).toBeVisible()
    //   const count = await blogItems.count()
      
    //   let previousLikes = Number.POSITIVE_INFINITY

    //   for (let i = 0; i < count; i++) {
    //     const blogItem = blogItems.nth(i)
    //     await blogItem.getByRole('button', {name: 'view'}).click()

    //     // Wait for likes to actually be visible before reading
    //     await expect(blogItem.locator('.likes-count')).toBeVisible()

    //     const likesText = await blogItem.locator('.likes-count').textContent()
    //     const likesCount = Number(likesText)
    //     console.log(`Blog ${i + 1} has ${likesCount} likes`)

    //     expect(likesCount).toBeLessThanOrEqual(previousLikes)
    //     previousLikes = likesCount
    //   }
    // })
  })
})