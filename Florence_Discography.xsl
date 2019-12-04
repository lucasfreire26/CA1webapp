<?xml version= "1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.orgç1999/XSL/Transform">
<xsl:template match="/"/>

    
    <xsl:template match="/">
        <html>
            <head>
                <title>Florence and the Machine Discography to purchase</title>
                <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
                <link href="Florence_discography.css" rel="stylesheet" type="text/css" />
                <!-- Include the JavaScript code for processing the XML data -->
                <script src="Florence_discography.js"></script>
                <script>
			        window.addEventListener("load", function() {
			            document.forms[0].txtBillAmt.value = calculateAmout('florenceDiscography');
			            document.querySelector("#calcBill").addEventListener("click", function() {
			                document.forms[0].txtBillAmt.value = calculateBill('');
			            });
			            document.querySelector("#showVeg").addEventListener("click", function() {
			                highlightVegetarian('florenceDiscography', this.checked);
			            });
			        });
			    </script>
            </head>
            <body>
                <h2>
                    <img src="https://ksassets.timeincuk.net/wp/uploads/sites/55/2019/04/florenceandthemachine-GettyImages-1131501303-920x584.jpg" alt="58" width="170" height="210" />Time to purchase music!</h2>
                <p>Select which CDs you would like to purchase below. To calculate the amount of the bill, click the Calculate Bill button. Check the "Live cds" box to highlight live cds.</p>
                <table id="florenceDiscography" border="1" class="indent">
                    <thead>
                        <tr>
                            <th colspan="5">Florence and the Machine Discography</th>
                        </tr>
                        <tr>
                            <th>Select</th>
                            <th>CD title</th>
                            <th>Cover</th>
                            <th>Year of Release</th>
                            <th>Price</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        <xsl:for-each select="florenceDiscography">
                            <tr>
                                <td colspan="5">
                                    <xsl:value-of select="@name" />
                                </td>
                            </tr>
                            <xsl:for-each select="cd">
                                <tr>
                                    <xsl:attribute name="live">
                                        <xsl:value-of select="boolean(./@live)" />
                                    </xsl:attribute>
                                    <td align="center">
                                        <input name="item0" type="checkbox" />
                                    </td>
                                    <td>
                                        <xsl:value-of select="title" />
                                    </td>
                                    <td align="right">
                                        <xsl:variable name="link" select="img" />
                                        <img src="{$link}"/>
                                    </td>
                                    <td align="right">
                                        <xsl:value-of select="yearOfRelease" />
                                    </td>
                                    <td align="right">
                                        <xsl:value-of select="price" />
                                    </td>
                                </tr>
                            </xsl:for-each>
                        </xsl:for-each>
                    </tbody>
                </table>
                <form class="indent">
                    <p>
                        <input type="button" name="btnCalcBill" value="Calculate Bill" id="calcBill" />
				Total: €
				<input type="text" name="txtBillAmt" /><input type="checkbox" name="cbOpts" value="isLive" id="showLive" /><label for="showLive">Show Live cds</label></p>
                </form>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>