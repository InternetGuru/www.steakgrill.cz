<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

<!--   <xsl:template match="p[@class = 'description' and text() = 'n/a']" /> -->
  
  <xsl:template match="form[contains(@id, 'inputvarform')]">
    <xsl:copy>
      <div class="section">
        <xsl:apply-templates select="node()|@*"/>
      </div>
    </xsl:copy>
  </xsl:template>

  <xsl:template match="node()|@*">
    <xsl:copy>
      <xsl:apply-templates select="node()|@*"/>
    </xsl:copy>
  </xsl:template>

</xsl:stylesheet>