// Package api.
package api

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"kanbananas/pkg/consts"
	"time"
)

// ------------------------------------ Public Functions ------------------------------------

// RegisterMiddlewares registers all middlewares for the application.
func RegisterMiddlewares() gin.HandlerFunc {
	return func(c *gin.Context) {
		logMiddleware(c)
		corsMiddleware(c)

		c.Next()
	}
}

// ------------------------------------ Private Helper Functions ------------------------------------

// logMiddleware sets up a logrus.Logger middleware for all requests.
func logMiddleware(ctx *gin.Context) {
	//logger.Log.WithFields(logrus.Fields{
	//	"path":   ctx.Request.URL.Path,
	//	"method": ctx.Request.Method,
	//}).Info("request received")

	ctx.Next()
}

// corsMiddleware sets up CORS headers for all requests.
func corsMiddleware(c *gin.Context) {
	cors.New(cors.Config{
		AllowOrigins:     []string{consts.DevelopmentUrl, consts.ProductionUrl},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowOriginFunc:  func(origin string) bool { return origin == consts.DevelopmentUrl || origin == consts.ProductionUrl },
		MaxAge:           12 * time.Hour,
	})(c)

	c.Next()
}
