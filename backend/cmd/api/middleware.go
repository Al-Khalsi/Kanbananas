// Package api.
package api

import (
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"kanbananas/pkg/logger"
)

// logMiddleware sets up a logrus.Logger middleware for all requests.
func logMiddleware(ctx *gin.Context) {
	logger.Log.WithFields(logrus.Fields{
		"path":   ctx.Request.URL.Path,
		"method": ctx.Request.Method,
	}).Info("request received")

	ctx.Next()
}
